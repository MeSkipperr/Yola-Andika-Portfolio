import fs from "fs";
import path from "path";

export class JsonStorage<T extends Record<string, unknown>> {
    private filePath: string;

    constructor(fileName: string) {
        this.filePath = path.join(process.cwd(), "src", "database", fileName);
        this.ensureFileExists();
    }

    private ensureFileExists() {
        const dir = path.dirname(this.filePath); // Ambil folder dari path file
    
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Buat folder jika belum ada
        }
    
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]", "utf8"); // Buat file JSON jika belum ada
        }
    }

    private readData(): T[] {
        try {
            const data = fs.readFileSync(this.filePath, "utf8");
            return JSON.parse(data) as T[];
        } catch (error) {
            console.error("Error reading JSON file:", error);
            return [];
        }
    }

    private writeData(data: T[]): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf8");
        } catch (error) {
            console.error("Error writing JSON file:", error);
        }
    }

    createItem(newItem: Omit<T, "id">): T {
        const data = this.readData();
        const newId = Date.now();
        const itemWithId = { id: newId, ...newItem } as unknown as T;

        data.push(itemWithId);
        this.writeData(data);
        return itemWithId;
    }

    getAllItems(): T[] {
        return this.readData();
    }

    getItemById(id: number): T | undefined {
        return this.readData().find((item) => item.id === id);
    }

    updateItem(id: number, updatedData: Partial<T>): T | null {
        const data = this.readData();
        const index = data.findIndex((item) => item.id === id);
        if (index === -1) return null;

        data[index] = { ...data[index], ...updatedData };
        this.writeData(data);
        return data[index];
    }

    deleteItem(id: number): boolean {
        const data = this.readData();
        const newData = data.filter((item) => item.id !== id);

        if (newData.length === data.length) return false;

        this.writeData(newData);
        return true;
    }
    getLength(): number {
        return this.readData().length;
    }
    /**
     * Mencari item berdasarkan kunci dan nilai secara dinamis
     * @param key Kunci properti yang akan dicari (misal: "name", "email")
     * @param value Nilai yang ingin dicari
     * @returns Item pertama yang cocok atau undefined jika tidak ditemukan
     */
    findItemByKey<K extends keyof T>(key: K, value: T[K]): T | undefined {
        return this.readData().find((item) => item[key] === value);
    }
}
