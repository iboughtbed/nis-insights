export const authorsConfig = {
  items: [
    { name: "Shahimaratovna Aser", role: "Founder" },
    { name: "Nurgeldyuly Yerassyl", role: "Founder" },
    { name: "Zhangaliev Sanzhar", role: "Website developer / Writer" },
    { name: "Serik Anuar", role: "Writer" },
    { name: "Kaiyrzhan Oraz", role: "Writer" },
    { name: "Kuptleuova Albina", role: "Writer" },
    { name: "Bulekbayev Alikhan", role: "Writer" },
    { name: "Myngzhassar Aikorkem", role: "Writer" },
    { name: "Yessenamanova Dilnaz", role: "Writer" },
    { name: "Kuandyk Ersultan", role: "Writer" },
    { name: "Zhaukenova Alina", role: "Writer" },
    { name: "Gabdusheva Elina", role: "Writer" },
    { name: "Amina Mereke", role: "Writer" },
    { name: "Anel Aitenova", role: "Writer" },
    { name: "Bekkaliyev Sultan", role: "Writer" },
  ],
} as const;

export type AuthorsConfig = typeof authorsConfig;
