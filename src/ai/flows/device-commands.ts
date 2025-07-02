'use server';
/**
 * @fileOverview A flow for sending remote commands to a device via Firestore.
 *
 * - sendDeviceCommand - A function that writes a command to the Firestore 'commands' collection.
 * - DeviceCommandInput - The input type for the sendDeviceCommand function.
 * - DeviceCommandOutput - The return type for the sendDeviceCommand function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

const DeviceCommandInputSchema = z.object({
  childId: z.string().describe("The unique ID of the child's device."),
  command: z.enum(['lock', 'unlock', 'sendMessage', 'openWebsite', 'openApp', 'pinApp', 'sendSms', 'hideApp', 'unhideApp']).describe('The type of command to send.'),
  payload: z.object({
    duration: z.string().optional().describe('The duration for the lock or pin command (e.g., "30 minutes").'),
    message: z.string().optional().describe('The text for the popup message or SMS.'),
    url: z.string().optional().describe('The URL for the website to open.'),
    packageName: z.string().optional().describe('The package name of the app to open or pin.'),
    appName: z.string().optional().describe('The display name of the app.'),
    recipient: z.string().optional().describe('The phone number for the SMS message.'),
  }).describe('The data associated with the command.'),
});
export type DeviceCommandInput = z.infer<typeof DeviceCommandInputSchema>;

const DeviceCommandOutputSchema = z.object({
  success: z.boolean().describe('Whether the command was successfully sent.'),
  message: z.string().describe('A confirmation message about the command status.'),
});
export type DeviceCommandOutput = z.infer<typeof DeviceCommandOutputSchema>;

export async function sendDeviceCommand(input: DeviceCommandInput): Promise<DeviceCommandOutput> {
  return deviceCommandFlow(input);
}

const deviceCommandFlow = ai.defineFlow(
  {
    name: 'deviceCommandFlow',
    inputSchema: DeviceCommandInputSchema,
    outputSchema: DeviceCommandOutputSchema,
  },
  async (input) => {
    try {
      // This flow now writes a command document to the 'commands' collection in Firestore.
      // The child's device would be listening for new documents in this collection
      // for its specific childId.
      await addDoc(collection(db, 'commands'), {
        childId: input.childId,
        command: input.command,
        payload: input.payload,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
    
      let message = `Unknown command sent.`;

      switch (input.command) {
          case 'lock':
              message = `Device lock command for ${input.payload.duration} has been sent.`;
              break;
          case 'unlock':
              message = `Device unlock command has been sent.`;
              break;
          case 'sendMessage':
              message = `Popup message has been sent.`;
              break;
          case 'openWebsite':
              message = `Command to open website has been sent.`;
              break;
          case 'openApp':
              message = `Command to open ${input.payload.appName || 'app'} has been sent.`;
              break;
          case 'pinApp':
              if (input.payload.duration) {
                  message = `Command to pin ${input.payload.appName || 'app'} for ${input.payload.duration} has been sent.`;
              } else {
                  message = `Command to pin ${input.payload.appName || 'app'} indefinitely has been sent.`;
              }
              break;
          case 'sendSms':
              message = `SMS to ${input.payload.recipient} has been queued for sending.`;
              break;
          case 'hideApp':
              message = `Command to hide ${input.payload.appName || 'app'} has been sent.`;
              break;
          case 'unhideApp':
              message = `Command to unhide ${input.payload.appName || 'app'} has been sent.`;
              break;
      }

      return {
        success: true,
        message,
      };

    } catch (error) {
      console.error("Error writing command to Firestore:", error);
      return {
        success: false,
        message: "Failed to write command to the database."
      }
    }
  }
);