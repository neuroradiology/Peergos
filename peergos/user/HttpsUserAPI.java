package peergos.user;

import akka.actor.ActorSystem;
import org.bouncycastle.operator.OperatorCreationException;
import peergos.crypto.SSL;
import peergos.storage.dht.Message;
import peergos.storage.net.HttpsMessenger;
import peergos.user.fs.Fragment;
import peergos.util.Serialize;
import scala.concurrent.Future;
import static akka.dispatch.Futures.future;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URL;
import java.security.*;
import java.security.cert.CertificateException;
import java.util.concurrent.Callable;

public class HttpsUserAPI extends DHTUserAPI
{
    private final URL target;
    private final ActorSystem system;

    public HttpsUserAPI(InetSocketAddress target, ActorSystem system) throws IOException
    {
        this.target = new URL("https", target.getHostString(), target.getPort(), HttpsMessenger.USER_URL);
        this.system = system;
        init();
    }

    public boolean init()
    {
        try {
            SSLContext sslContext = SSLContext.getInstance("TLS");

            char[] password = "storage".toCharArray();
            KeyStore ks = SSL.getKeyStore(password); // fudge to get testing on a single machine working, need to fix the SSL chain recognition
//            KeyStore ks = SSL.getTrustedKeyStore();
            TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
            tmf.init(ks);

            // setup the HTTPS context and parameters
            sslContext.init(null, tmf.getTrustManagers(), null);
            SSLContext.setDefault(sslContext);
            return true;
        }
        catch (NoSuchAlgorithmException |InvalidKeyException |KeyStoreException |CertificateException |
                NoSuchProviderException |SignatureException|OperatorCreationException |
                KeyManagementException|IOException ex)
        {
            System.err.println("Failed to create HTTPS port");
            ex.printStackTrace(System.err);
            return false;
        }
    }

    @Override
    public Future<Boolean> put(final byte[] key, final byte[] value, final String user, final byte[] sharingKey, final byte[] signedHashOfKey) {
        Future<Boolean> f = future(new Callable<Boolean>() {
            public Boolean call() {
                HttpsURLConnection conn = null;
                try
                {
                    long start = System.nanoTime();
                    conn = (HttpsURLConnection) target.openConnection();
                    conn.setDoInput(true);
                    conn.setDoOutput(true);
                    DataOutputStream dout = new DataOutputStream(conn.getOutputStream());
                    Message m = new Message.PUT(key, value.length, user, sharingKey, signedHashOfKey);
                    m.write(dout);
                    Serialize.serialize(value, dout);
                    dout.flush();

                    DataInputStream din = new DataInputStream(conn.getInputStream());
                    int success = din.readInt();

                    long end = System.nanoTime();
                    if (success > 0)
                    {
                        System.out.printf("Uploaded succeeded in %d mS\n", (end-start)/1000000);
                        return true;
                    }
                    String message = Serialize.deserializeString(din, 10*1024);
                    System.out.printf("Uploaded failed in %d mS, with message %s\n", (end-start)/1000000, message);
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                } finally {
                    if (conn != null)
                        conn.disconnect();
                }
                return false;
            }
        }, system.dispatcher());
        return f;
    }

    @Override
    public Future<Boolean> contains(final byte[] key) {
        Future<Boolean> f = future(new Callable<Boolean>() {
            public Boolean call() {
                HttpsURLConnection conn = null;
                try
                {
                    conn = (HttpsURLConnection) target.openConnection();
                    conn.setDoInput(true);
                    conn.setDoOutput(true);
                    DataOutputStream dout = new DataOutputStream(conn.getOutputStream());
                    Message m = new Message.GET(key);
                    m.write(dout);
                    dout.writeInt(2); // CONTAINS
                    dout.flush();

                    DataInputStream din = new DataInputStream(conn.getInputStream());
                    int success = din.readInt();
                    return din.readInt() != 0;
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                } finally {
                    if (conn != null)
                        conn.disconnect();
                }
                return false;
                }
        }, system.dispatcher());
        return f;
    }

    @Override
    public Future<byte[]> get(final byte[] key) {
        Future<byte[]> f = future(new Callable<byte[]>() {
            public byte[] call() {
                HttpsURLConnection conn = null;
                try
                {
                    conn = (HttpsURLConnection) target.openConnection();
                    conn.setDoInput(true);
                    conn.setDoOutput(true);
                    DataOutputStream dout = new DataOutputStream(conn.getOutputStream());
                    Message m = new Message.GET(key);
                    m.write(dout);
                    dout.writeInt(2); // CONTAINS
                    dout.flush();

                    DataInputStream din = new DataInputStream(conn.getInputStream());
                    int success = din.readInt();
                    return Serialize.deserializeByteArray(din, Fragment.SIZE);
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                } finally {
                    if (conn != null)
                        conn.disconnect();
                }
                return null;
                }
        }, system.dispatcher());
        return f;
    }
}
