function minimumStepsToMakeStrongPassword(password) {
    let steps = 0;
  
    // Check password length
    if (password.length < 6) {
      steps += 6 - password.length;
    } else if (password.length > 20) {
      steps += password.length - 20;
    }
  
    // Check lowercase, uppercase, and digit presence
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
  
    if (!hasLowercase) {
      steps++;
    }
    if (!hasUppercase) {
      steps++;
    }
    if (!hasDigit) {
      steps++;
    }
  
    // Check for three repeating characters in a row
    for (let i = 0; i < password.length - 2; i++) {
      if (
        password[i] === password[i + 1] &&
        password[i] === password[i + 2]
      ) {
        steps++;
        break;
      }
    }
  
    return steps;
  }