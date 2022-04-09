package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.entity.Mapping;
import com.example.smartmedicalregistry.entity.Role;
import com.example.smartmedicalregistry.entity.User;
import com.example.smartmedicalregistry.repository.MappingRepo;
import com.example.smartmedicalregistry.repository.RoleRepo;
import com.example.smartmedicalregistry.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final MappingRepo mappingRepo;

    public UserService(UserRepo userRepo, RoleRepo roleRepo, MappingRepo mappingRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.mappingRepo = mappingRepo;
    }

    public void save(User user, String userType) {
        if (user.getAuthorities().isEmpty()) {
            List<Role> roleList;
            if (userType.equals("Admin")) {
                roleList = Arrays.asList(roleRepo.findById(1L).get());
            } else if (userType.equals("Doctor")) {
                roleList = Arrays.asList(roleRepo.findById(2L).get());
            } else if (userType.equals("Compounder")) {
                roleList = Arrays.asList(roleRepo.findById(3L).get());
            } else {
                roleList = Arrays.asList(roleRepo.findById(4L).get());
            }

            user.setAuthorities(roleList);
        }
        user.setPassword(passCustomEncoder().encode(user.getPassword()));
        userRepo.save(user);
    }

    public void saveAll(List<User> userList) {
        userList.forEach(user -> {
            user.setPassword(passCustomEncoder().encode(user.getPassword()));
        });
        userRepo.saveAll(userList);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }
        return user;
    }

    public boolean isUserExist(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            return true;
        } else {
            return false;
        }
    }

    public boolean isUserExistInMapping(String username, String userType) {
        Mapping mapping;
        if (userType.equals("Doctor")) {
            mapping = mappingRepo.findByDoctor(username);
        } else {
            mapping = mappingRepo.findByCompounder(username);
        }
        if (mapping != null) {
            return true;
        } else {
            return false;
        }
    }

    public User getUserDetails(String username) {
        return userRepo.findByUsername(username);
    }

    public void mapDoctorAndCompounder(Mapping mapping) {
        mappingRepo.save(mapping);
    }

    /*--------------------HELPER METHOD---------------------*/
    public PasswordEncoder passCustomEncoder() {
        return new BCryptPasswordEncoder();
    }

}