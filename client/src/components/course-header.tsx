interface CourseHeaderProps {
  title: string;
  description: string;
}

export function CourseHeader({ title, description }: CourseHeaderProps) {
  return (
    <div className="flex flex-col gap-1 items-center pb-6">
      <h2 className="text-4xl md:text-5xl leading-10">{title}</h2>
      <p className="text-neutral-400 dark:text-neutral-500 text-center text-md md:text-lg">
        {description}
      </p>
    </div>
  );
}
