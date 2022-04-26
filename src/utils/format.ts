import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDate = (value: string): string => {
  return format(new Date(value), 'dd MMM yyyy', {
    locale: ptBR,
  });
};
