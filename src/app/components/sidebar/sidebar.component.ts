import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  faBook,
  faChalkboardTeacher,
  faGraduationCap,
  faCalendarAlt,
  faChevronDown,
  faChevronUp,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

interface Link {
  name: string;
  url: string;
  icon: any;
  sublinks?: Sublink[];
  isOpen?: boolean;
}

interface Sublink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true, // Add this line to make it a standalone component
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('subMenuAnimation', [
      state('closed', style({
        height: '0',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        visibility: 'visible'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faSignOut = faSignOutAlt;

  links: Link[] = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: faBook,
      isOpen: false
    },
    {
      name: 'Professeurs',
      url: '/professeur',
      icon: faChalkboardTeacher,
      isOpen: false,
      sublinks: [
        {
          name: 'Liste des Professeurs',
          url: '/professeur'
        },
        {
          name: 'Ajouter un Professeur',
          url: '/professeurs/ajouter'
        }
      ]
    },
    {
      name: 'Classes',
      url: '/classes',
      icon: faBook,
      isOpen: false
    },
    {
      name: 'Abscences',
      url: '/abscences',
      icon: faBook,
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSubMenu(link: Link, event: Event): void {
    // Prevent default navigation behavior
    event.preventDefault();
    event.stopPropagation();

    // Close all other submenus (optional)
    this.links.forEach(l => {
      if (l !== link && l.isOpen) {
        l.isOpen = false;
      }
    });

    // Toggle the clicked submenu
    link.isOpen = !link.isOpen;
    console.log(`Toggled ${link.name} to ${link.isOpen ? 'open' : 'closed'}`);
  }

  getSubMenuIcon(link: Link): any {
    return link.isOpen ? this.faChevronUp : this.faChevronDown;
  }
}