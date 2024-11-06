// arweaveWallet.d.ts
interface Window {
    arweaveWallet: {
        connect: (permissions: string[]) => void;
        getActiveAddress: (permissions: string[]) => Promise<string>;
        getActivePublicKey: (permissions: string[]) => Promise<string>;
        getPermissions: () => string[];
        // Add any other methods you might use, such as `connect`, `disconnect`, etc.
    };
}
