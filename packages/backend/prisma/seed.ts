import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: 'Product 1',
    features: ['Цветовая гамма: монохромная', 'Количество цветов: 6'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/01.jpg',
          alt: 'Product 1'
        }
      ]
    }
  },
  {
    name: 'Product 2',
    features: ['Цветовая гамма: аналогичная', 'Количество цветов: 22'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/02.jpg',
          alt: 'Product 2'
        }
      ]
    }
  },
  {
    name: 'Product 3',
    features: ['Feature 1', 'Feature 2'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/03.jpg',
          alt: 'Product 3'
        }
      ]
    }
  },
  {
    name: 'Product 4',
    features: ['Цветовая гамма: аналогичная', 'Количество цветов: 32'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/04.jpg',
          alt: 'Product 4'
        }
      ]
    }
  },
  {
    name: 'Product 5',
    features: ['Цветовая гамма: монохромная', 'Количество цветов: 10'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/05.jpg',
          alt: 'Product 5'
        }
      ]
    }
  },
  {
    name: 'Product 6',
    features: ['Цветовая гамма: аналогичная', 'Количество цветов: 12'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/06.jpg',
          alt: 'Product 6'
        }
      ]
    }
  },
  {
    name: 'Product 7',
    features: ['Цветовая гамма: монохромная', 'Количество цветов: 18'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/07.jpg',
          alt: 'Product 7'
        }
      ]
    }
  },
  {
    name: 'Product 8',
    features: ['Цветовая гамма: комплементарная', 'Количество цветов: 24'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/08.jpg',
          alt: 'Product 8'
        }
      ]
    }
  },
  {
    name: 'Product 9',
    features: ['Цветовая гамма: аналогичная', 'Количество цветов: 8'],
    price: 2000,
    images: {
      create: [
        {
          src: '/static/images/LandingPage/HeroSection/09.jpg',
          alt: 'Product 8'
        }
      ]
    }
  }
];

async function main() {
  console.log(`Start seeding ...`);

  for (const row of productData) {
    const product = await prisma.product.create({
      data: row
    });

    console.log(`Created product with id: ${product.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
