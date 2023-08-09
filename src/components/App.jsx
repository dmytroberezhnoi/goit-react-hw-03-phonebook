import React from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { СontactList } from './ContactList/ContactList';

import css from './App.module.css';

// const startContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // localStorage.setItem(`contacts`, JSON.stringify(startContacts));
    const data = JSON.parse(localStorage.getItem(`contacts`));
    if (data) {
      this.setState({
        contacts: data,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(`contacts`, JSON.stringify(this.state.contacts));
    }
  }
  addContact = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.addContact}
          contacts={this.state.contacts}
        />
        {this.state.contacts.length !== 0 && (
          <>
            <h2 className={css.title}>Contacts</h2>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <СontactList
              visibleCont={visibleContacts}
              deleteContacts={this.deleteContact}
            />
          </>
        )}
        {/* {this.state.contacts.length === 0 ? (
          <span></span>
        ) : (
          <>
            <h2 className={css.title}>Contacts</h2>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <СontactList
              visibleCont={visibleContacts}
              deleteContacts={this.deleteContact}
            />
          </>
        )} */}
      </>
    );
  }
}
