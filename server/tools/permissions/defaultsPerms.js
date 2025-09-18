const { chapterPerms, questionsPerms, tagsPerms } = require("./courses")
const { pages } = require("./pages")

const defaultsPerms = [
    ...Object.values(pages),
    ...chapterPerms(null, 'lecturesShow'),
    ...questionsPerms('manageQuestions'),
    ...tagsPerms('manageTags')
].flat().filter(p => p.isDefault).map(p => p.id)

module.exports = { defaultsPerms }