import fs from 'fs';

export const deteleFile = async (fileName: string): Promise<void> => {
    try {
        await fs.promises.stat(fileName);
    } catch {
        return;
    }
    await fs.promises.unlink(fileName);
};
