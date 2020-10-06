import { v4 as uuidv4 } from 'uuid';
import { Redis } from 'ioredis';
import * as SparkPost from 'sparkpost';

const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const createConfirmEmailLink = async (url: string, userID: string, redis: Redis): Promise<string> => {
  const id = uuidv4();
  await redis.set(id, userID, 'ex', 60 * 60 * 24);
  return `${url}/confirm/${id}`;
};

export const sendEmail = async (recipientAddress: string, url: string): Promise<void> => {
  try {
    const response = await client.transmissions.send({
      options: {
        sandbox: true
      },
      content: {
        from: 'testing@sparkpostbox.com',
        subject: 'Cinema App Email Confirmation',
        html: `
        <html>
          <body>
            <p>Nice to see you! Please verify your email by clicking this link:<p/>
            <a href="${url}">Verification Link</a>
          </body>
        </html>
      `
      },
      recipients: [{
        address: recipientAddress
      }]
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
