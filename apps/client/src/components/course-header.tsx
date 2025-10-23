interface CourseHeaderProps {
  title: string;
  description: string;
}

export function CourseHeader({ title, description }: CourseHeaderProps) {
  return (
    <div className="flex flex-col gap-1 items-center font-medium pb-6">
      <h2 className="text-4xl md:text-5xl leading-10 pb-2">{title}</h2>
      <p className="text-neutral-600 dark:text-neutral-400 text-center font-light text-md md:text-lg">
        {description}
      </p>
    </div>
  );
}
