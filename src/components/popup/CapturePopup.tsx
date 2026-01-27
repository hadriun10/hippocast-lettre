import { useState, useEffect } from 'react';
import { Button, TextField, Dropdown } from '../ui';
import type { PopupFormData } from '../../types';
import { INTERET_PREPA } from '../../config/questions.config';
import { EMAIL_REGEX, PHONE_REGEX } from '../../config/constants';

interface CapturePopupProps {
  isOpen: boolean;
  onSubmit: (data: PopupFormData) => void;
  isLoading: boolean;
}

export function CapturePopup({ isOpen, onSubmit, isLoading }: CapturePopupProps) {
  const [formData, setFormData] = useState<Partial<PopupFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof PopupFormData, string>>>({});
  const [visibleFields, setVisibleFields] = useState(1);
  const [checkboxes, setCheckboxes] = useState({
    age: false,
    score: false,
    contact: false,
    privacy: false,
  });

  // Progressive field reveal
  useEffect(() => {
    if (formData.email && EMAIL_REGEX.test(formData.email) && visibleFields === 1) {
      setTimeout(() => setVisibleFields(2), 300);
    }
  }, [formData.email, visibleFields]);

  useEffect(() => {
    if (formData.telephone && PHONE_REGEX.test(formData.telephone.replace(/\s/g, '')) && visibleFields === 2) {
      setTimeout(() => setVisibleFields(3), 300);
    }
  }, [formData.telephone, visibleFields]);

  useEffect(() => {
    if (formData.interetPrepa && visibleFields === 3) {
      setTimeout(() => setVisibleFields(4), 300);
    }
  }, [formData.interetPrepa, visibleFields]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PopupFormData, string>> = {};

    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.telephone) {
      newErrors.telephone = 'Téléphone requis';
    } else if (!PHONE_REGEX.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }

    if (!formData.interetPrepa) {
      newErrors.interetPrepa = 'Sélectionne une option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && allCheckboxesChecked) {
      onSubmit(formData as PopupFormData);
    }
  };

  const allCheckboxesChecked = checkboxes.age && checkboxes.score && checkboxes.contact && checkboxes.privacy;

  const isFormValid =
    formData.email &&
    EMAIL_REGEX.test(formData.email) &&
    formData.telephone &&
    PHONE_REGEX.test(formData.telephone.replace(/\s/g, '')) &&
    formData.interetPrepa &&
    allCheckboxesChecked;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="bg-white border-2 border-black rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in"
      >
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Derniere etape pour voir ta lettre !
            </h2>
            <p className="text-text-secondary text-sm">
              Remplis ces informations pour acceder a ta lettre personnalisee
            </p>
          </div>

          {/* Incentive */}
          <div className="bg-violet/5 border border-violet/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-violet mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clipRule="evenodd"
                />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
              <p className="text-sm text-violet-dark font-medium">
                Bonus : Recois une methode pour reussir la prepa PASS/LAS par email !
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email - always visible */}
            <div className="animate-fade-in">
              <TextField
                label="Ton email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="exemple@email.com"
                required
                error={errors.email}
              />
            </div>

            {/* Phone - appears after valid email */}
            {visibleFields >= 2 && (
              <div className="animate-fade-in">
                <TextField
                  label="Ton numero de telephone"
                  type="tel"
                  value={formData.telephone || ''}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  placeholder="06 12 34 56 78"
                  required
                  error={errors.telephone}
                />
              </div>
            )}

            {/* Prepa interest - appears after valid phone */}
            {visibleFields >= 3 && (
              <div className="animate-fade-in">
                <Dropdown
                  label="Tu envisages de faire une prepa ?"
                  options={INTERET_PREPA}
                  value={formData.interetPrepa || ''}
                  onChange={(value) =>
                    setFormData({ ...formData, interetPrepa: value as PopupFormData['interetPrepa'] })
                  }
                  required
                  error={errors.interetPrepa}
                />
              </div>
            )}

            {/* Checkboxes - appear after prepa selection */}
            {visibleFields >= 4 && (
              <div className="space-y-3 pt-4 border-t border-gray-200 animate-fade-in">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.age}
                    onChange={(e) => setCheckboxes({ ...checkboxes, age: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    J'ai au moins 15 ans et j'ai pris connaissance des{' '}
                    <a href="https://www.hippocast.fr/cgu-calculateur" target="_blank" rel="noopener noreferrer" className="text-violet underline">
                      Conditions Generales d'Utilisation
                    </a>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.score}
                    onChange={(e) => setCheckboxes({ ...checkboxes, score: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    Je comprends que le score affiche est une estimation statistique, fondee sur des donnees publiques et une etude interne Hippocast (473 etudiants), et qu'il ne garantit pas un resultat individuel.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.contact}
                    onChange={(e) => setCheckboxes({ ...checkboxes, contact: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    J'accepte de recevoir des informations personnalisees sur mon orientation et ma methode de travail, de la part d'un etudiant ayant reussi sa premiere annee de sante. A cette fin, j'accepte que Hippocast transmette mes coordonnees.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.privacy}
                    onChange={(e) => setCheckboxes({ ...checkboxes, privacy: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    J'accepte que Hippocast traite mes donnees personnelles afin de calculer et d'afficher mon estimation personnalisee, conformement a la{' '}
                    <a href="https://www.hippocast.fr/regles-de-confidentialite-calculateur" target="_blank" rel="noopener noreferrer" className="text-violet underline">
                      politique de confidentialite
                    </a>.
                  </span>
                </label>
              </div>
            )}
          </div>

          {visibleFields >= 4 && (
            <Button
              type="submit"
              className="w-full mt-6 animate-fade-in"
              disabled={!isFormValid}
              isLoading={isLoading}
            >
              Voir ma lettre
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
