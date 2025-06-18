import pool from './db';


export class User {
    constructor(id, naam, wachtwoord, email) {
      this.id = id;
      this.naam = naam;
      this.wachtwoord = wachtwoord;
      this.email = email;
    }
  
    isEmailValid() {
        return this.email.includes('@') && this.email.includes('.');
      }
      
    isWachtwoordSterk() {
      return this.wachtwoord.length >= 4;
    }

    // Statische methode om een nieuwe gebruiker te registreren
    static async registreer(naam, wachtwoord, email) {
      try {
        // Valideer input
        if (!naam || !wachtwoord || !email) {
          throw new Error('Alle velden zijn verplicht');
        }

        // Maak een tijdelijke user instance voor validatie
        const tempUser = new User(null, naam, wachtwoord, email);
        
        if (!tempUser.isEmailValid()) {
          throw new Error('Ongeldig email adres');
        }

        if (!tempUser.isWachtwoordSterk()) {
          throw new Error('Wachtwoord moet minimaal 4 karakters lang zijn');
        }

        // Controleer of email al bestaat
        const [existingUsers] = await pool.execute(
          'SELECT * FROM user WHERE email = ?',
          [email]
        );

        if (existingUsers.length > 0) {
          throw new Error('Email adres is al in gebruik');
        }

        // Voeg nieuwe gebruiker toe aan database
        const [result] = await pool.execute(
          'INSERT INTO user (naam, email, wachtwoord) VALUES (?, ?, ?)',
          [naam, email, wachtwoord]
        );

        // Maak en retourneer nieuwe User instance
        return new User(result.insertId, naam, wachtwoord, email);
      } catch (error) {
        throw error;
      }
    }

    // Statische methode om in te loggen
    static async inloggen(email, wachtwoord) {
      try {
        // Valideer input
        if (!email || !wachtwoord) {
          throw new Error('Email en wachtwoord zijn verplicht');
        }

        // Zoek gebruiker op email
        const [users] = await pool.execute(
          'SELECT * FROM user WHERE email = ?',
          [email]
        );

        if (users.length === 0) {
          throw new Error('Email of wachtwoord is incorrect');
        }

        const user = users[0];

        // Controleer wachtwoord (in een echte app zou je hashing gebruiken)
        if (user.wachtwoord !== wachtwoord) {
          throw new Error('Email of wachtwoord is incorrect');
        }

        // Retourneer user object zonder wachtwoord
        return new User(user.id, user.naam, null, user.email);
      } catch (error) {
        throw error;
      }
    }

    // Statische methode om uit te loggen
    static async uitloggen() {
      try {
        // In een echte app zou je hier session cleanup doen
        // Voor nu returnen we gewoon success
        return { success: true, message: 'Uitgelogd' };
      } catch (error) {
        throw error;
      }
    }
}

    