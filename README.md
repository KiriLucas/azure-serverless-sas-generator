# Shared Access Signature generator

I've made this function just to make it easier for me and my team to generate shared access signature tokens for Event Hubs.
Not meant to be pretty, but helpful.

You only need to provide a name and the connection string for the event hubs and the function shall return a valid SAS Token.

Oh, also, because of reasons, the expiry time is set to something close to 264 years (Just type 9999999999 on https://www.epochconverter.com/)