# Cifrario degli Arpisti con Supabase Authentication

## Integrazione con Supabase e Deployment su Vercel

Questa guida ti aiuterà a integrare l'autenticazione Supabase con il tuo progetto "Cifrario degli Arpisti" e a deployarlo su Vercel.

## Prerequisiti

1. Un account [Supabase](https://supabase.com/)
2. Un account [Vercel](https://vercel.com/)
3. Node.js installato sul tuo computer

## Configurazione Supabase

1. Crea un nuovo progetto su Supabase
2. Vai a Authentication → Settings e configura:
   - Email auth provider (abilitato di default)
   - Conferma se vuoi richiedere la verifica dell'email
3. Copia l'URL del progetto e la Anon Key dalla dashboard (Settings → API)

## Installazione e setup locale

1. Installa le dipendenze aggiuntive:
   ```bash
   npm install @supabase/supabase-js react-router-dom
   ```

2. Crea un file `.env` nella root del progetto e aggiungi:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Testa l'applicazione in locale:
   ```bash
   npm run dev
   ```

## Deployment su Vercel

1. Carica il tuo progetto su GitHub
2. Accedi a Vercel e importa il repository GitHub
3. Configura le variabili d'ambiente in Vercel:
   - Aggiungi `REACT_APP_SUPABASE_URL` con il valore del tuo URL Supabase
   - Aggiungi `REACT_APP_SUPABASE_ANON_KEY` con la tua chiave anonima Supabase
4. Deploy!

## Note Importanti

### Struttura dei File

I file principali per l'autenticazione sono:
- `src/utils/supabaseClient.js` - Inizializza il client Supabase
- `src/context/AuthContext.js` - Gestisce lo stato di autenticazione
- `src/components/auth/*` - Componenti per login, registrazione e protezione delle rotte

### Funzionalità implementate

- Login con email/password
- Registrazione di nuovi utenti
- Protezione delle rotte (accesso solo per utenti autenticati)
- Logout
- Persistenza della sessione utente

### Modifiche da apportare a seconda delle esigenze

- Se vuoi altri provider di autenticazione (Google, GitHub, ecc.), configurali su Supabase e modifica il codice di conseguenza
- Per funzionalità aggiuntive come recupero password, modifica il componente `Login.js`
- Per personalizzare le email di verifica, vai nella dashboard di Supabase → Authentication → Email Templates

## Risorse utili

- [Documentazione Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentazione di Vercel per React](https://vercel.com/docs/frameworks/react)
- [React Router Docs](https://reactrouter.com/docs/en/v6)