import { useState, useEffect } from 'react';
import { useFormStore } from '../store/useFormStore';

interface Prepa {
  nom: string;
  ville: string;
  universites: string[];
  lien: string;
}

export function usePrepaPartenaire() {
  const [prepas, setPrepas] = useState<Prepa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { answers } = useFormStore();

  const university = answers.university as string | undefined;

  useEffect(() => {
    fetch('/prepa.json')
      .then((res) => res.json())
      .then((data) => {
        setPrepas(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const prepaPartenaire = university
    ? prepas.find((p) => p.universites.includes(university))
    : undefined;

  return {
    prepaPartenaire,
    hasPrepaPartenaire: !!prepaPartenaire,
    isLoading,
  };
}
