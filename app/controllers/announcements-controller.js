export const getAnnouncementById = async (req, res, next) => {
    res.json({response: "Pojedyncze ogłoszenie"})
}
export const getAnnouncements = async (req, res, next) => {
    res.json({response: "Wiele ogłoszeń"})
}