import { siteConfig } from "@/content/site"

export const siteContent = {
  wedding: {
    date: siteConfig.wedding.date,
    time: siteConfig.wedding.time,
  },
  ceremony: {
    time: siteConfig.ceremony.guestsTime ?? siteConfig.ceremony.time,
  },
  details: {
    rsvp: {
      deadline: siteConfig.details.rsvp.deadline,
    },
  },
}
