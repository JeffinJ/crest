import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({});
    },
    handleServerError(error, utils) {
        console.error(error);
        const { clientInput, metadata } = utils;
        console.log("Client input", clientInput);
        console.log("Metadata", metadata);
        return { failure: "An error occurred" };
    },
});