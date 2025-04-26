#!/bin/bash

# Script per creare la struttura del progetto React per Cifrario Arpisti

echo "Creazione della struttura del progetto React per Cifrario Arpisti..."

# Creazione delle directory principali
mkdir -p public
mkdir -p src/components
mkdir -p src/assets/icons
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p messages

# Creazione dei file principali nella cartella src/components
touch src/components/App.js
touch src/components/MessageList.js
touch src/components/MessageCard.js
touch src/components/KeyInputModal.js
touch src/components/DecryptedMessageModal.js
touch src/components/ErrorModal.js

# Creazione delle icone
touch src/assets/icons/ScrollIcon.js

# Creazione degli utilities
touch src/utils/messageUtils.js

# Creazione dei custom hooks
touch src/hooks/useMessages.js

# Creazione dei file di stile
touch src/App.css
touch src/index.css

# Creazione del file principale di React
touch src/index.js

# Creazione dei file della cartella public
touch public/index.html
touch public/messages.json

# Creazione dei file principali nella root del progetto
touch server.js
touch message-loader.js
touch package.json

echo "Struttura del progetto creata con successo!"
echo "Per rendere lo script eseguibile usa: chmod +x setup-project.sh"
echo "Poi esegui: ./setup-project.sh"