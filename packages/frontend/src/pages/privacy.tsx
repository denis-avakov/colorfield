import Layout from 'components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout
      title="О нас – COLORFIELD"
      className="relative flex flex-col overflow-hidden bg-white py-16"
    >
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
        <div className="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
          <svg
            className="absolute top-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>

          <svg
            className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>

          <svg
            className="absolute bottom-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-indigo-600">
              COLORFIELD
            </span>

            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Privacy Policy
            </span>
          </h1>

          <p className="mt-8 text-xl leading-8 text-gray-500">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
            nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at
            in viverra scelerisque eget. Eleifend egestas fringilla sapien.
          </p>
        </div>

        <div className="prose prose-indigo prose-lg mx-auto mt-6 text-gray-500">
          <p>
            Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed{' '}
            <strong>eget risus enim</strong>. Mattis mauris semper sed amet vitae sed turpis id. Id
            dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat
            velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.{' '}
            <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
          </p>

          <p>
            Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit
            viverra aliquam porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum
            ut nisl, justo, amet, mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed
            elit interdum dignissim.
          </p>

          <h2>From beginner to expert in 30 days</h2>
          <p>
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu
            ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh.
            Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus
            ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.
          </p>

          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
            semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
            viverra tellus varius sit neque erat velit.
          </p>
        </div>
      </div>
    </Layout>
  );
}
