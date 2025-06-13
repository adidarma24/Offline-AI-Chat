import Dexie, { Table } from "dexie";

/**
 * Struktur data untuk pesan chat.
 */
export interface DEX_Message {
  id: string; // UUID unik untuk pesan
  role: "user" | "assistant"; // Peran pengirim pesan
  content: string; // Isi pesan
  threadId: string; // ID thread tempat pesan berada
  created_at: Date; // Waktu pembuatan pesan
  thought: string; // Catatan atau pemikiran tambahan
}

/**
 * Struktur data untuk thread/chat room.
 */
export interface DEX_Thread {
  id: string; // UUID unik untuk thread
  title: string; // Judul thread
  created_at: Date; // Waktu pembuatan thread
  updated_at: Date; // Waktu terakhir thread diperbarui
}

/**
 * Kelas utama untuk database chat menggunakan Dexie.js
 */
class ChatDB extends Dexie {
  messages!: Table<DEX_Message, string>; // Tabel untuk pesan
  threads!: Table<DEX_Thread, string>; // Tabel untuk thread

  constructor() {
    super("chatdb"); // Nama database

    // Definisi skema tabel
    this.version(1).stores({
      messages: "id, role, content, threadId, created_at",
      threads: "id, title, created_at, updated_at",
    });

    // Hook: Set waktu otomatis saat membuat thread baru
    this.threads.hook("creating", (_key, obj) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });

    // Hook: Set waktu otomatis saat membuat pesan baru
    this.messages.hook("creating", (_key, obj) => {
      obj.created_at = new Date();
    });
  }

  /**
   * Membuat thread baru.
   * @param title Judul thread
   * @returns ID thread yang baru dibuat
   */
  async createThread(title: string) {
    const id = crypto.randomUUID();

    await this.threads.add({
      id,
      title,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return id;
  }

  /**
   * Mengambil semua thread, diurutkan berdasarkan waktu update terbaru.
   */
  async getAllThreads() {
    return this.threads.reverse().sortBy("updated_at");
  }

  /**
   * Membuat pesan baru dan memperbarui waktu update thread terkait.
   * @param message Data pesan (tanpa id & created_at)
   * @returns ID pesan yang baru dibuat
   */
  async createMessage(
    message: Pick<DEX_Message, "role" | "content" | "threadId" | "thought">
  ) {
    const messageId = crypto.randomUUID();

    await this.transaction("rw", [this.messages, this.threads], async () => {
      await this.messages.add({
        ...message,
        id: messageId,
        created_at: new Date(),
      });

      // Update waktu thread saat ada pesan baru
      await this.threads.update(message.threadId, {
        updated_at: new Date(),
      });
    });

    return messageId;
  }

  /**
   * Mengambil semua pesan untuk thread tertentu, diurutkan berdasarkan waktu pembuatan.
   * @param threadId ID thread
   */
  async getMessagesForThread(threadId: string) {
    return this.messages
      .where("threadId")
      .equals(threadId)
      .sortBy("created_at");
  }
}

// Ekspor instance database
export const db = new ChatDB();
