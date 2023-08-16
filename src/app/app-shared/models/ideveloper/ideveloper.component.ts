export interface IDeveloper {
  firstName: string,
  emailAddress: string,
  project: {
    isSubscribed: boolean,
    developerRole: string,
  },
}