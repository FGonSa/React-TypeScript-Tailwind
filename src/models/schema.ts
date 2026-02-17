import {z} from "zod";

export const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "El título es obligatorio"),
    completed: z.boolean(),
    priority: z.enum(["Baja", "Media", "Alta"]),
    isFavorite: z.boolean(),
    userId: z.string(),
});

export type TaskSchema = z.infer<typeof TaskSchema>;