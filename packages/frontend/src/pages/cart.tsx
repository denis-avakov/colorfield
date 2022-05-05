import { useState, useEffect } from 'react';
import { RemoveEmpty, EmojiPuzzled, EmojiSingRightNote } from 'iconoir-react';
import { Formik, Field } from 'formik';
import { isEmpty } from 'lodash';
import classNames from 'utils/classNames';
import useCartProducts from 'hooks/useCartProducts';
import Layout from 'components/Layout';

function InputField(props: any) {
  const hasError = props.errors && props.touched;

  return (
    <div className={props.className}>
      <label htmlFor={props.id} className="mb-1 block text-sm font-medium text-gray-700">
        {props.label}
      </label>

      <input
        type="text"
        name={props.name}
        id={props.id}
        className={classNames(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          hasError &&
            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
        )}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values}
      />

      <p className="mt-2 text-sm text-red-600">{hasError && props.errors}</p>
    </div>
  );
}

function BookingForm(props: any) {
  const defaultFields = {
    coupon: '',
    email: '',
    phone: '',
    firstName: '',
    secondName: '',
    deliveryType: 'Почта России',
    paymentType: 'Карта МИР',
    city: '',
    address: '',
    zip: '',
    comment: ''
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = 'Введите ваш электронный адрес';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Некорректный электронный адрес';
    }

    if (!values.phone) {
      errors.phone = 'Введите ваш телефон';
    } else if (!/^\+7\d{10}$/.test(values.phone)) {
      errors.phone = 'Некорректный телефон';
    }

    if (!values.firstName) {
      errors.firstName = 'Введите ваше имя';
    }

    if (!values.secondName) {
      errors.secondName = 'Введите вашу фамилию';
    }

    if (!values.city) {
      errors.city = 'Введите ваш город';
    }

    if (!values.address) {
      errors.address = 'Введите ваш адрес';
    }

    if (!values.zip) {
      errors.zip = 'Введите ваш почтовый индекс';
    }

    return errors;
  };

  return (
    <Formik initialValues={defaultFields} validate={validate} onSubmit={props.onSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <InputField
              className="w-full"
              name="coupon"
              id="coupon"
              label="Купон"
              placeholder="TEST100"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.coupon}
              errors={errors.coupon}
              touched={touched.coupon}
            />

            <InputField
              className="w-full"
              name="email"
              id="email"
              label="Электронный адрес *"
              placeholder="example@example.com"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.email}
              errors={errors.email}
              touched={touched.email}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <InputField
              className="w-full"
              name="phone"
              id="phone"
              label="Номер телефона *"
              placeholder="+7 (999) 999-99-99"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.phone}
              errors={errors.phone}
              touched={touched.phone}
            />

            <InputField
              className="w-full"
              name="firstName"
              id="firstName"
              label="Имя *"
              placeholder="Иван"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.firstName}
              errors={errors.firstName}
              touched={touched.firstName}
            />

            <InputField
              className="w-full"
              name="secondName"
              id="secondName"
              label="Фамилия *"
              placeholder="Иванов"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.secondName}
              errors={errors.secondName}
              touched={touched.secondName}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <div role="group" aria-labelledby="delivery-type-radio-group">
              <label className="text-base font-medium text-gray-900">Способ доставки</label>

              <fieldset className="mt-4">
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="delivery-type-by-post"
                      name="deliveryType"
                      value="Почта России"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <label
                      htmlFor="delivery-type-by-post"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Почта России
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div role="group" aria-labelledby="payment-type-radio-group">
              <label className="text-base font-medium text-gray-900">Способ оплаты</label>

              <fieldset className="mt-4">
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="payment-type-by-card"
                      name="payment-type"
                      value="Карта МИР"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <label
                      htmlFor="payment-type-by-card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Карта МИР
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="payment-type-by-cash"
                      name="paymentType"
                      value="Наличными при получении"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <label
                      htmlFor="payment-type-by-cash"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Наличными при получении
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <InputField
              className="w-full"
              name="city"
              id="city"
              label="Город *"
              placeholder="Москва"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.city}
              errors={errors.city}
              touched={touched.city}
            />

            <InputField
              className="w-full"
              name="address"
              id="address"
              label="Адрес *"
              placeholder="Адрес вашей улицы"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.address}
              errors={errors.address}
              touched={touched.address}
            />

            <InputField
              className="w-full"
              name="zip"
              id="zip"
              label="Индекс *"
              placeholder="Индекс"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values.zip}
              errors={errors.zip}
              touched={touched.zip}
            />
          </div>

          <button type="submit" className="button-primary-outline" disabled={isSubmitting}>
            Оформить заказ
          </button>

          <p className="-mt-6 text-center text-sm text-gray-400">
            Даю согласие на обработку персональных данных
          </p>
        </form>
      )}
    </Formik>
  );
}

export default function Cart() {
  const [storage, setStorage] = useCartProducts();
  const [cartProducts, setCartProducts] = useState<any>([]);

  const [cartProductsQuantity, setCartProductsQuantity] = useState<number>(0);
  const [cartProductsPrice, setCartProductsPrice] = useState<number>(0);

  const [accessCode, setAccessCode] = useState<string>();

  useEffect(() => {
    if (!isEmpty(storage)) {
      setCartProducts(storage);
    }
  }, [storage]);

  useEffect(() => {
    const calcQuantity = (acc: number, product: any) => acc + product.quantity;
    const calcPrice = (acc: number, product: any) => acc + product.price * product.quantity;
    const products = Object.values(cartProducts);

    setCartProductsQuantity(products.reduce(calcQuantity, 0));
    setCartProductsPrice(products.reduce(calcPrice, 0));
  }, [cartProducts]);

  const removeProductById = (id: string) => {
    const newCartProducts = {
      ...cartProducts
    };

    delete newCartProducts[id];
    setCartProducts(newCartProducts);
    setStorage(newCartProducts);
  };

  const onSubmit = async (values: any) => {
    const data = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...values,
        products: cartProducts
      })
    }).then((response) => response.json());

    console.log(Object.values(cartProducts));
    console.log(JSON.stringify(data, null, 2));

    if (data.success) {
      setAccessCode(data.accessCode);
      setStorage({});
      setCartProducts([]);
    }
  };

  return (
    <Layout title="Оформление заказа – COLORFIELD">
      <h1 className="mb-8 text-3xl font-medium">Оформление заказа</h1>

      {!isEmpty(accessCode) ? (
        <>
          <p className="text-3xl font-medium text-zinc-600">
            <span>Спасибо за заказ!</span>
            <br />
            <span className="text-xl text-zinc-500">Воспользуйтесь вашим кодом от редактора</span>
            <br />
            <code className="relative top-4 overflow-hidden rounded-lg bg-red-100 px-2 py-1.5 font-bold text-red-400">
              {accessCode}
            </code>
          </p>
        </>
      ) : isEmpty(cartProducts) ? (
        <p className="flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 p-4 text-center font-medium text-zinc-500">
          <span>В корзине пока пусто</span>
          <EmojiPuzzled className="ml-3 h-8 w-8" strokeWidth={1.2} />
        </p>
      ) : (
        <>
          <ul role="list" className="divide-y-2 divide-gray-200 border-y-4">
            {Object.values(cartProducts).map((product: any) => (
              <li key={product.id} className="flex items-center justify-between py-3">
                <h3 className="font-medium text-gray-900">
                  <span>{product.name}</span>
                  <span className="ml-1 text-gray-400">x{product.quantity}</span>
                </h3>

                <div className="flex items-center">
                  <p className="text-gray-500">{product.price} руб.</p>

                  <button
                    type="button"
                    className="text-gray-400 transition-colors hover:text-gray-700"
                    onClick={() => removeProductById(product.id)}
                  >
                    <RemoveEmpty className="ml-3 h-6 w-6" strokeWidth={1.8} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <BookingForm onSubmit={onSubmit} />
        </>
      )}
    </Layout>
  );
}
