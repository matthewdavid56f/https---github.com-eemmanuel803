'use server';
/**
 * @fileOverview A flow for sending remote commands to a device.
 *
 * - sendDeviceCommand - A function that handles sending various commands.
 * - DeviceCommandInput - The input type for the sendDeviceCommand function.
 * - DeviceCommandOutput - The return type for the sendDeviceCommand function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DeviceCommandInputSchema = z.object({
  childName: z.string().describe("The name of the child whose device will receive the command."),
  command: z.enum(['lock', 'unlock', 'sendMessage', 'openWebsite', 'openApp', 'pinApp', 'sendSms']).describe('The type of command to send.'),
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
    // In a real application, this is where you would interact
    // with a service like Firebase Cloud Messaging to send the
    // command to the actual device.
    // For this prototype, we will just simulate a successful command.
    
    let message = `Unknown command sent to ${input.childName}'s device.`;

    switch (input.command) {
        case 'lock':
            message = `Device lock command for ${input.payload.duration} sent to ${input.childName}'s device.`;
            break;
        case 'unlock':
            message = `Device unlock command sent to ${input.childName}'s device.`;
            break;
        case 'sendMessage':
            message = `Popup message sent to ${input.childName}'s device.`;
            break;
        case 'openWebsite':
            message = `Force open website command sent to ${input.childName}'s device.`;
            break;
        case 'openApp':
            message = `Command to open ${input.payload.appName || 'app'} sent to ${input.childName}'s device.`;
            break;
        case 'pinApp':
            if (input.payload.duration) {
                message = `Command to pin ${input.payload.appName || 'app'} for ${input.payload.duration} sent to ${input.childName}'s device.`;
            } else {
                message = `Command to pin ${input.payload.appName || 'app'} indefinitely sent to ${input.childName}'s device.`;
            }
            break;
        case 'sendSms':
            message = `SMS to ${input.payload.recipient} queued for sending from ${input.childName}'s device.`;
            break;
    }

    return {
      success: true,
      message,
    };
  }
);
