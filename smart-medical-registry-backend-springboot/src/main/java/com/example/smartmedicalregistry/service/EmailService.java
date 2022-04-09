package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.entity.Email;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;

@Service
@EnableAsync
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    @Async
    public void sendEmail(Email email) throws MessagingException, IOException {

        MimeMessage msg = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(email.getEmailTo());
        helper.setSubject(email.getEmailSubject());
        helper.setText(email.getEmailBody());
        helper.addAttachment("SmartMedicalRegistry.png", new ClassPathResource("image/email attachment.png"));
        javaMailSender.send(msg);
    }


}
