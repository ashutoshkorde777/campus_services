import { useEffect } from 'react'
import axios from 'axios'
import './Sidebar.css'
import {
  FiMenu,
  FiClipboard,
  FiBriefcase,
  FiUser,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { BsTicket } from 'react-icons/bs'
import { PiOfficeChair } from 'react-icons/pi'
import { MdBook, MdOutlineModelTraining } from 'react-icons/md'
import { useState } from 'react'
import { FaChalkboardTeacher, FaUserAlt } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IoIosGrid } from 'react-icons/io'
import { GiSkills } from 'react-icons/gi'
import { TbSubtask } from 'react-icons/tb'
import { BsListTask } from 'react-icons/bs'

// Utility to map icon strings to actual icon components
const iconMap = {
  FiClipboard: <FiClipboard size={22} color="white" />,
  FiBriefcase: <FiBriefcase size={22} color="white" />,
  FiUser: <FiUser size={22} color="white" />,
  BsTicket: <BsTicket size={22} color="white" />,
  PiOfficeChair: <PiOfficeChair size={22} color="white" />,
  MdOutlineModelTraining: <MdOutlineModelTraining size={22} color="white" />,
  MdBook: <MdBook size={22} color="white" />,
  FaUserAlt: <FaUserAlt size={22} color="white" />,
  FaChalkboardTeacher: <FaChalkboardTeacher size={22} color="white" />,
  GiSkills: <GiSkills size={22} color="white" />,
  AiOutlineCheckCircle: <AiOutlineCheckCircle size={22} color="white" />,
  IoIosGrid: <IoIosGrid size={22} color="white" />,
  TbSubtask: <TbSubtask size={22} color="white" />,
  BsListTask: <BsListTask size={22} color="white" />,
}

const Sidebar = () => {
  const navigate = useNavigate()
  const [openSection, setOpenSection] = useState(null)
  const [employeeAccess1, setEmployeeAccess1] = useState('0')
  const [trainerAccess, setTrainerAccess] = useState('0')

  
;

  console.log("EMP: ", employeeAccess1);
        console.log("TRAINER: ", trainerAccess);
  
  const HRManagementAccess = '11111111111111111111111111'
  const ProjectManagementAccess = '11111111111111111111111111'
  const TrainingManagementAccess = '11111111111111111111111111'
  const TicketManagementAccess = '11111111111111111111111111'

  console.log("TRaining management: ", TrainingManagementAccess[0]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  const closeSubmenus = () => {
    setOpenSection(null)
  }

  const navItems = [
    {
      name: 'Services',
      access: '1',
      icon: 'MdBook',
      children: [
      ],
    },
    {
      name: 'Transactions',
      access: '1',
      icon: 'FiBriefcase',
      children: [
      ],
    },
    {
      name: 'Logout',
      icon: 'BsTicket',
      access: '1',
      children: [
      ],
    },
    
  ]

  return (
    <div className="sidebar" onMouseLeave={closeSubmenus}>
      <div>
        <FiMenu className="menu-icon" size={22} color="white" />
        <div className="menu">
          {navItems.map(
            (item) =>
              item.access === '1' && (
                <div key={item.name}>
                  <div
                    className="icon-container main-item"
                    onClick={() => item.children && toggleSection(item.name)}
                  >
                    <div className="main-item-content">
                      {iconMap[item.icon]}
                      <span className="menu-text">{item.name}</span>
                    </div>
                    {item.children && (
                      <span className="chevron">
                        {openSection === item.name ? (
                          <FiChevronUp size={18} color="white" />
                        ) : (
                          <FiChevronDown size={18} color="white" />
                        )}
                      </span>
                    )}
                  </div>
                  {item.children && (
                    <div
                      className={`submenu ${
                        openSection === item.name ? 'expanded' : ''
                      }`}
                    >
                      {item.children.map(
                        (child) =>
                          child.access === '1' && (
                            <Link
                              key={child.name}
                              to={child.slug}
                              className="icon-container"
                            >
                              {iconMap[child.icon]}
                              <span className="menu-text">{child.name}</span>
                            </Link>
                          )
                      )}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Sidebar