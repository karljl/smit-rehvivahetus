export function checkError(errorCode: number) {
  switch (errorCode) {
    case 422:
      return 'See aeg on juba broneeritud. Palun vali uus aeg.';
    case 500:
      return 'Midagi läks meie poolel valesti. Palun proovi hiljem uuesti või võta ühendust klienditoega: support@rv.ee';
    default:
      return 'Midagi läks valesti. Palun proovi uuesti.';
  }
}
