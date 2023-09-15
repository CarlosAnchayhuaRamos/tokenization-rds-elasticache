export class TokenGenerator {
  private usedTokens: Set<string> = new Set();

  private generateRandomChar(): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters?.length);
    return characters[randomIndex];
  }

  private generateUniqueToken(): string {
    let token: string;
    do {
      token = '';
      for (let i = 0; i < 16; i = i + 1) {
        token += this.generateRandomChar();
      }
    } while (this.usedTokens.has(token));

    this.usedTokens.add(token);
    return token;
  }

  public generateToken(): string {
    return this.generateUniqueToken();
  }
}
