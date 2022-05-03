import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HexColorPicker } from 'react-colorful';
import ColorScheme from 'color-scheme';
import { ArrowSeparateVertical, Check } from 'iconoir-react';
import Layout from 'components/Layout';
import ImageCrop from 'components/ImageCrop';
import useUser from 'hooks/useUser';

const schemes = [
  { name: 'mono' },
  { name: 'contrast' },
  { name: 'triade' },
  { name: 'tetrade' },
  { name: 'analogic' },
  { name: 'default' }
];

export default function EditorPro() {
  const [color, setColor] = useState('#eb4034');
  const [colorScheme, setColorScheme] = useState([]);
  const [schemeType, setSchemeType] = useState(schemes[0]);

  const { user } = useUser({
    redirectTo: '/editor/login'
  });

  useEffect(() => {
    const scheme = new ColorScheme();

    if (schemeType.name === 'default') {
      setColorScheme([]);
    } else {
      // prettier-ignore
      scheme.from_hex(color.replace('#', '')).scheme(schemeType.name).variation('soft');
      setColorScheme(scheme.colors());
    }
  }, [color, schemeType]);

  return (
    <Layout
      title="Бесплатный онлайн редактор – COLORFIELD"
      className="flex flex-col justify-center space-y-8"
    >
      <ImageCrop colorScheme={colorScheme} />

      <Listbox value={schemeType} onChange={setSchemeType}>
        <div className="relative z-10 mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{schemeType.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ArrowSeparateVertical className="opacity-75" strokeWidth={1.6} aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {schemes.map((scheme, key) => (
                <Listbox.Option
                  key={key}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={scheme}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {scheme.name}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <Check className="opacity-75" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {schemeType.name === 'default' ? (
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <span>Будут взяты основные цвета из изображения</span>
        </div>
      ) : (
        <>
          <HexColorPicker color={color} onChange={setColor} className="px-1" />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {colorScheme.map((color, index) => (
              <div key={index} className="h-10 w-20" style={{ backgroundColor: '#' + color }} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
