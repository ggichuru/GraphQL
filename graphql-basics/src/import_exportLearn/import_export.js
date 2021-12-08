/**
 * @default NamedExport
 * @description It has a name, and can have as many as possible
 * @importing imported as objects
 */

const message = "Some message from my module"
const name = "GG"


/**
 * @default DefaultExport
 * @implements Default export has no name
 * @importing Imported [import anyName from 'location']
 */
const location = "Nairobi"

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export { message, getGreeting, name, location as default }

