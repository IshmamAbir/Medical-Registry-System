package com.example.smartmedicalregistry.init;

import com.example.smartmedicalregistry.entity.Bkash;
import com.example.smartmedicalregistry.entity.Role;
import com.example.smartmedicalregistry.entity.Test;
import com.example.smartmedicalregistry.entity.User;
import com.example.smartmedicalregistry.repository.BkashRepo;
import com.example.smartmedicalregistry.repository.RoleRepo;
import com.example.smartmedicalregistry.repository.TestRepo;
import com.example.smartmedicalregistry.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoleRepo roleRepo;
    private final UserService userService;
    private final TestRepo testRepo;
    private final BkashRepo bkashRepo;

    public DataInitializer(RoleRepo roleRepo, UserService userService, TestRepo testRepo, BkashRepo bkashRepo) {
        this.roleRepo = roleRepo;
        this.userService = userService;
        this.testRepo = testRepo;
        this.bkashRepo = bkashRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Role> roleList = Arrays.asList(
                new Role("ADMIN"),
                new Role("DOCTOR"),
                new Role("COMPOUNDER"),
                new Role("PATIENT")
        );
         roleRepo.saveAll(roleList);


        List<Role> roleList1 = Arrays.asList(roleRepo.findById(1L).get());
        List<Role> roleList2 = Arrays.asList(roleRepo.findById(2L).get());
        List<Role> roleList3 = Arrays.asList(roleRepo.findById(3L).get());
        List<Role> roleList4 = Arrays.asList(roleRepo.findById(4L).get());

        List<User> userList = Arrays.asList(
                new User("admin", "12345", "Admin", "018501", roleList1),
                new User("doctor", "12345", "Doctor", "018501", roleList2),
                new User("compounder", "12345", "Compounder", "018501", roleList3),
                new User("patient", "12345", "Patient", "018501", roleList4),
                new User("no", "12345", "Patient", "018501", roleList4)
        );
        userService.saveAll(userList);


        List<Test> testList = Arrays.asList(
                new Test("Blood Test - Glucose", 300, "Sat, Sun, Mon", "5:00 PM - 10:00 PM", "No Prerequisite"),
                new Test("Blood Test - Calcium", 500, "Sat, Mon, Tue", "7:00 AM - 1:00 PM", "No Prerequisite"),
                new Test("Blood Test - Cholesterol & Lipid", 1000, "Sat, Sun, Mon, Wed", "10:00 AM - 10:00 PM", "Fasting Recommended ( 10-12 Hr )"),
                new Test("Blood Test - ESR", 2000, "Sat, Wed", "11:00 AM - 4:00 PM", "No Alcohol (2 Months)"),
                new Test("Kidney Function Test", 3000, "Sat, Sun, Mon, Wed", "9:00 AM - 4:00 PM", "No Alcohol (2 Months)"),
                new Test("Pregnancy Test", 1200, "Sat, Sun, Mon, Wed", "7:00 AM - 9:00 AM", "You Should Test First Thing in The Morning"),
                new Test("Urinalysis", 700, "Sat, Tue, Wed", "11:00 AM - 4:00 PM", "Sterile Container & Wipes Obtain From Lab")
        );
        testRepo.saveAll(testList);

        List<Bkash> bkashList = Arrays.asList(
                new Bkash("01521327998", "1234", 500000),
                new Bkash("01842327998", "1234", 700000)
        );
        bkashRepo.saveAll(bkashList);
    }
}
