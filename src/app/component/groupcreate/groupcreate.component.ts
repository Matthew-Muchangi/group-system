import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupcreate',
  templateUrl: './groupcreate.component.html',
  styleUrls: ['./groupcreate.component.css']
})
export class GroupCreateComponent implements OnInit {
  groupName: string = ''; // Holds the current group name
  memberName: string = ''; // Holds the current member name input
  savedAmount: number = 0; // Holds the saved amount input

  groups: { name: string; members: { name: string; savedAmount: number }[] }[] = [];
  members: { name: string; savedAmount: number }[] = []; // Members of the currently creating group

  ngOnInit(): void {
    this.loadGroupsFromStorage();
  }

  // Function to create a new group
  createGroup(): void {
    if (!this.groupName) {
      alert('Please provide a group name!');
      return;
    }

    // Save the new group in the array
    this.groups.push({ name: this.groupName, members: [...this.members] });

    console.log('Group Created:', this.groups);

    // Save to LocalStorage
    this.saveGroupsToStorage();

    // Reset input fields
    this.groupName = '';
    this.members = [];
  }

  // Function to add a member to the current group
  addMember(): void {
    if (!this.memberName || this.savedAmount <= 0) {
      alert('Please enter valid member details!');
      return;
    }

    this.members.push({ name: this.memberName, savedAmount: this.savedAmount });

    console.log('Member Added:', this.members);

    // Reset member input fields
    this.memberName = '';
    this.savedAmount = 0;
  }

  // Function to save groups in LocalStorage
  saveGroupsToStorage(): void {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  // Function to load groups from LocalStorage
  loadGroupsFromStorage(): void {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      this.groups = JSON.parse(storedGroups);
    }
  }
}
