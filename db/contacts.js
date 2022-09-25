const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	return (
		(await listContacts()).find(
			(contact) => contact.id === String(contactId)
		) || null
	);
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex(
		(contact) => contact.id === String(contactId)
	);
	if (index === -1) return null;
	const contact = contacts.splice(index, 1);
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const id = String(Number(contacts[contacts.length - 1].id) + 1);
	const newContact = { id, name, email, phone };
	fs.writeFile(
		contactsPath,
		JSON.stringify([...contacts, newContact], null, 2)
	);
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
