# rails_firebase_auth_example

## Setup frontend

```bash
cd frontend
cp .env.sample .env

# edit .env
# vi .env

yarn
yarn start
```

## Setup backend

```bash
cd backend
bundle exec rails db:reset db:create db:migrate
bundle install
bundle exec rails s
```