import { useState, useEffect } from 'react';
import { Button } from '../ui';
import type { PopupFormData } from '../../types';
import { EMAIL_REGEX } from '../../config/constants';
import { ConsentReminderModal1 } from './ConsentReminderModal1';
import { ConsentReminderModal2 } from './ConsentReminderModal2';

interface CapturePopupProps {
  isOpen: boolean;
  onSubmit: (data: PopupFormData & { consent: 'oui' | 'non' }) => void;
  isLoading: boolean;
}

const COUNTRY_CODES = [
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+32', flag: '🇧🇪', name: 'Belgique' },
  { code: '+41', flag: '🇨🇭', name: 'Suisse' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+377', flag: '🇲🇨', name: 'Monaco' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
];

// Format phone number with spaces every 2 digits
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  // Add space every 2 digits
  const formatted = digits.replace(/(\d{2})(?=\d)/g, '$1 ');
  return formatted;
};

export function CapturePopup({ isOpen, onSubmit, isLoading }: CapturePopupProps) {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Visible fields tracking (progressive reveal)
  const [showEmail, setShowEmail] = useState(false);
  const [showTelephone, setShowTelephone] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // Checkboxes state
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [acceptConseils, setAcceptConseils] = useState(false);
  const [acceptDonnees, setAcceptDonnees] = useState(false);

  // Track if case 2 and 3 have been shown (they stay visible once shown)
  const [hasShownCase2, setHasShownCase2] = useState(false);
  const [hasShownCase3, setHasShownCase3] = useState(false);

  // Consent modals state
  const [showConsentModal1, setShowConsentModal1] = useState(false);
  const [showConsentModal2, setShowConsentModal2] = useState(false);

  // Progressive field reveal - email after prenom
  useEffect(() => {
    if (prenom.length >= 2 && !showEmail) {
      setTimeout(() => setShowEmail(true), 300);
    }
  }, [prenom, showEmail]);

  useEffect(() => {
    if (email && EMAIL_REGEX.test(email) && !showTelephone) {
      setTimeout(() => setShowTelephone(true), 300);
    }
  }, [email, showTelephone]);

  useEffect(() => {
    // Check if phone has at least 9 digits (without spaces)
    const phoneDigits = telephone.replace(/\s/g, '');
    if (phoneDigits.length >= 9 && !showCheckboxes) {
      setTimeout(() => setShowCheckboxes(true), 300);
    }
  }, [telephone, showCheckboxes]);

  // Show case 2 when CGU is checked
  useEffect(() => {
    if (acceptCGU && !hasShownCase2) {
      setTimeout(() => setHasShownCase2(true), 300);
    }
  }, [acceptCGU, hasShownCase2]);

  // Show case 3 when Conseils is checked (but keep it visible once shown)
  useEffect(() => {
    if (acceptConseils && !hasShownCase3) {
      setTimeout(() => setHasShownCase3(true), 300);
    }
  }, [acceptConseils, hasShownCase3]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    // Limit to reasonable length (10 digits = 14 chars with spaces)
    if (formatted.replace(/\s/g, '').length <= 10) {
      setTelephone(formatted);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!prenom || prenom.length < 2) {
      newErrors.prenom = 'Prenom requis';
    }

    if (!email) {
      newErrors.email = 'Email requis';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Email invalide';
    }

    const phoneDigits = telephone.replace(/\s/g, '');
    if (!telephone) {
      newErrors.telephone = 'Telephone requis';
    } else if (phoneDigits.length < 9) {
      newErrors.telephone = 'Numero de telephone invalide';
    }

    if (!acceptCGU) {
      newErrors.acceptCGU = 'Tu dois accepter les CGU';
    }

    if (!acceptDonnees) {
      newErrors.acceptDonnees = 'Tu dois accepter le traitement des donnees';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // If conseils checkbox is checked, submit directly with consent="oui"
    if (acceptConseils) {
      submitWithConsent('oui');
    } else {
      // Show first consent reminder modal
      setShowConsentModal1(true);
    }
  };

  const submitWithConsent = (consent: 'oui' | 'non') => {
    onSubmit({
      email,
      telephone: countryCode + ' ' + telephone,
      prenom,
      consent,
    });
  };

  // Consent Modal 1 handlers
  const handleConsentModal1Accept = () => {
    setShowConsentModal1(false);
    submitWithConsent('oui');
  };

  const handleConsentModal1Refuse = () => {
    setShowConsentModal1(false);
    setShowConsentModal2(true);
  };

  // Consent Modal 2 handlers
  const handleConsentModal2Accept = () => {
    setShowConsentModal2(false);
    submitWithConsent('oui');
  };

  const handleConsentModal2Refuse = () => {
    setShowConsentModal2(false);
    submitWithConsent('non');
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  const phoneDigits = telephone.replace(/\s/g, '');
  const isFormValid =
    prenom.length >= 2 &&
    email &&
    EMAIL_REGEX.test(email) &&
    phoneDigits.length >= 9 &&
    acceptCGU &&
    acceptDonnees;

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal - hidden when consent modals are shown */}
      {!showConsentModal1 && !showConsentModal2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border-2 border-black rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
            <form onSubmit={handleSubmit} className="p-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-text-primary mb-6">
                Ta lettre personnalisee est prete !
              </h2>

              {/* Dr. Constantin Section */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/dr_constantin_hays_remove_bg.webp"
                  alt="Dr. Constantin Hays"
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-600">
                    Chaque année, des milliers d'étudiants galèrent avec leur lettre. J'ai créé Hippo pour que la tienne te ressemble, te mette en valeur et plaise aux jurys !
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Dr. Constantin Hays.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Prenom - shown directly */}
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Ton prenom :
                  </label>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Thomas"
                    className="w-full px-4 py-3 bg-white border-2 border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
                  />
                  {errors.prenom && <p className="mt-1.5 text-sm text-red-500">{errors.prenom}</p>}
                </div>

                {/* Email */}
                {showEmail && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Ta meilleure adresse email :
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="thomas.grosbois@gmail.com"
                      className="w-full px-4 py-3 bg-white border-2 border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                  </div>
                )}

                {/* Telephone with country code */}
                {showTelephone && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      A quel numero on t'envoie <span className="font-bold">ta lettre</span> ?
                    </label>
                    <div className="flex gap-2">
                      {/* Country selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-1 px-3 py-3 bg-white border-2 border-border rounded-lg text-text-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
                        >
                          <span className="text-lg">{selectedCountry.flag}</span>
                          <span className="text-sm">{selectedCountry.code}</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-border rounded-lg shadow-lg z-10">
                            {COUNTRY_CODES.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setCountryCode(country.code);
                                  setShowCountryDropdown(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                              >
                                <span className="text-lg">{country.flag}</span>
                                <span className="text-sm">{country.code}</span>
                                <span className="text-sm text-gray-500">{country.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Phone input */}
                      <input
                        type="tel"
                        value={telephone}
                        onChange={handlePhoneChange}
                        placeholder="6 12 34 56 78"
                        className="flex-1 px-4 py-3 bg-white border-2 border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
                      />
                    </div>
                    {errors.telephone && <p className="mt-1.5 text-sm text-red-500">{errors.telephone}</p>}
                  </div>
                )}

                {/* Checkboxes */}
                {showCheckboxes && (
                  <div className="space-y-3 pt-4 border-t border-gray-200 animate-fade-in">
                    {/* Case 1: CGU - Obligatoire - Always visible */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptCGU}
                        onChange={(e) => setAcceptCGU(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                      />
                      <span className="text-[10px] text-gray-600 leading-relaxed">
                        J'ai au moins 15 ans et j'ai pris connaissance des{' '}
                        <a
                          href="https://www.hippocast.fr/regles-de-confidentialite-calculateur"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-semibold"
                        >
                          Conditions Generales d'Utilisation
                        </a>
                        . Je comprends que le score affiche est une estimation statistique, fondee sur des
                        donnees publiques et une etude interne Hippocast (473 etudiants), et qu'il ne
                        garantit pas un resultat individuel.
                      </span>
                    </label>

                    {/* Case 2: Conseils - Optionnelle - Shows when CGU checked, stays visible */}
                    {hasShownCase2 && (
                      <label className="flex items-start gap-3 cursor-pointer animate-fade-in">
                        <input
                          type="checkbox"
                          checked={acceptConseils}
                          onChange={(e) => setAcceptConseils(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                        />
                        <span className="text-[10px] text-gray-600 leading-relaxed">
                          J'accepte de recevoir des informations personnalisees sur mon orientation et ma
                          methode de travail, de la part d'un etudiant ayant reussi sa premiere annee de
                          sante. A cette fin, j'accepte que Hippocast transmette mes coordonnees.
                        </span>
                      </label>
                    )}

                    {/* Case 3: Donnees - Obligatoire - Shows when Conseils checked, stays visible */}
                    {hasShownCase3 && (
                      <label className="flex items-start gap-3 cursor-pointer animate-fade-in">
                        <input
                          type="checkbox"
                          checked={acceptDonnees}
                          onChange={(e) => setAcceptDonnees(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                        />
                        <span className="text-[10px] text-gray-600 leading-relaxed">
                          J'accepte que Hippocast traite mes donnees personnelles afin de calculer et
                          d'afficher mon estimation personnalisee, conformement a la{' '}
                          <a
                            href="https://www.hippocast.fr/regles-de-confidentialite-calculateur"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-semibold"
                          >
                            politique de confidentialite
                          </a>
                          .
                        </span>
                      </label>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button - visible as soon as checkboxes appear, but disabled until form is valid */}
              {showCheckboxes && (
                <div className="mt-6 animate-fade-in">
                  <Button
                    type="submit"
                    className="w-full bg-violet hover:bg-violet-dark text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid}
                    isLoading={isLoading}
                  >
                    <div className="flex flex-col items-center">
                      <span>Recevoir ma lettre personnalisee</span>
                      <span className="text-sm opacity-90">et mon plan d'action pour progresser</span>
                    </div>
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Consent Reminder Modal 1 */}
      <ConsentReminderModal1
        isOpen={showConsentModal1}
        onAccept={handleConsentModal1Accept}
        onRefuse={handleConsentModal1Refuse}
      />

      {/* Consent Reminder Modal 2 */}
      <ConsentReminderModal2
        isOpen={showConsentModal2}
        onAccept={handleConsentModal2Accept}
        onRefuse={handleConsentModal2Refuse}
      />
    </>
  );
}
