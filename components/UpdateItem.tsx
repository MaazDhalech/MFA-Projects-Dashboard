import { ProjectUpdate } from "@/types/project";

interface UpdateItemProps {
  update: ProjectUpdate;
}

export function UpdateItem({ update }: UpdateItemProps) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{new Date(update.createdAt).toLocaleDateString()}</span>
        <span className="font-semibold uppercase tracking-wide text-slate-400">
          {update.authorName}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
        {update.note}
      </p>
    </li>
  );
}
