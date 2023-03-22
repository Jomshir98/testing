import { MessageSubstitute } from 'jomshir-test-common';

Start().catch((error) => {
	console.error('Init failed:', error);
	process.exit(1);
});

/**
 * Starts the application.
 */
async function Start(): Promise<void> {
	console.log(MessageSubstitute("ME says hi!", { ME: 'Srv2' }));
}
