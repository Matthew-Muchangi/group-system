import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-group-list',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: any[] = [];
  selectedGroup: any = null;
  isViewMode: boolean = true;
  modalTitle: string = 'View Group Members';

  constructor() {}

  ngOnInit() {
    this.loadGroupsFromLocalStorage();
  }

  loadGroupsFromLocalStorage() {
    // Retrieve groups from local storage
    const groupsFromStorage = localStorage.getItem('groups');
    if (groupsFromStorage) {
      this.groups = JSON.parse(groupsFromStorage);
    } else {
      
      this.groups = [];
    }
  }

  viewGroupMembers(group: any) {
    this.selectedGroup = group;
    this.isViewMode = true;
    this.modalTitle = 'View Group Members';
    this.openModal();
  }

  openEditGroupModal(group: any) {
    this.selectedGroup = group;
    this.isViewMode = false;
    this.modalTitle = 'Edit Group Members';
    this.openModal();
  }

  toggleViewMode() {
    this.isViewMode = !this.isViewMode;
    this.modalTitle = this.isViewMode
      ? 'View Group Members'
      : 'Edit Group Members';
  }

  openModal() {
    const modalElement = document.getElementById('viewEditGroupMembersModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveGroupChanges() {
    
    const updatedGroups = [...this.groups];
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    console.log('Group Changes Saved:', this.selectedGroup);
  }

  removeMember(index: number) {
    this.selectedGroup.members.splice(index, 1);
    this.saveGroupChanges();  // Save updated groups after removing a member
  }

  addMemberToGroup() {
    const newMember = { name: '', savedAmount: 0 };
    this.selectedGroup.members.push(newMember);
    this.saveGroupChanges();  // Save updated groups after adding a member
  }

  deleteGroup(groupId: number): void {
  const index = this.groups.findIndex(group => group.id === groupId);
  if (index !== -1) {
    this.groups.splice(index, 1); // This deletes only the specific group at the index
    console.log('Group Deleted:', groupId);
    this.saveGroupChanges(); // Re-save to LocalStorage after deletion
  }
}

}
