import classNames from 'utils/classNames';

type VideoGuideProps = {
  className?: string;
};

export default function VideoGuide(props: VideoGuideProps) {
  return (
    <section className={classNames(props.className)}>
      <div className="relative rounded-lg shadow-lg">
        <button
          type="button"
          className="relative block min-h-[30rem] w-full overflow-hidden rounded-lg bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <div
            className="absolute inset-0 flex h-full w-full flex-col items-center justify-center"
            aria-hidden="true"
          >
            <svg className="h-20 w-20 text-indigo-500" fill="currentColor" viewBox="0 0 84 84">
              <circle opacity="0.9" cx={42} cy={42} r={42} fill="white" />
              <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
            </svg>
          </div>

          <div className="absolute right-5 bottom-5">
            <span className="rounded-lg bg-black bg-opacity-20 px-2 py-1 text-indigo-100">
              4:05
            </span>
          </div>
        </button>
      </div>

      <h3 className="text-md mt-3 text-center font-medium lg:pr-2 lg:text-right">
        Короткая инструкция по созданию картины из личной фотографии
      </h3>
    </section>
  );
}
