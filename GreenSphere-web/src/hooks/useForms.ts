import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, getFormSchema } from '../schemas/formSchema';
import defaultImg from '../assets/images/planta.jpg?url';

export const useForms = () => {
  const [schema, setSchema] = useState<any>(null);
  const [loadingSchema, setLoadingSchema] = useState(true);

  useEffect(() => {
    async function loadSchema() {
      try {
        const formSchema = await getFormSchema();
        setSchema(formSchema);
      } catch (error) {
        console.error('Error loading schema:', error);
      } finally {
        setLoadingSchema(false);
      }
    }
    loadSchema();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: {
      imgUrl: defaultImg,
    },
  });

  return { register, handleSubmit, reset, errors, loadingSchema, defaultImg };
};
