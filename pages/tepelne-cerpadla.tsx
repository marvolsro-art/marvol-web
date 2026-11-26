import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/fotovoltika-pre-domacnosti',
      permanent: true,
    },
  };
};

export default function TepelneCerpadlaRedirect() {
  return null;
}
