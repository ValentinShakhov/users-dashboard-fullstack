package assignment.backend;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Transactional
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class IntegrationTest {

    @Autowired
    TestRestTemplate restTemplate;

    @LocalServerPort
    private int port = 0;

    @Test
    void shouldCreateEditDeleteUser() {
        addUser();
        assertEquals(HttpStatus.OK, getUser());
        editUser();
        deleteUser();
        assertEquals(HttpStatus.NOT_FOUND, getUser());
    }

    void addUser() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(APPLICATION_JSON);

        ResponseEntity<String> res = restTemplate.exchange(
                "http://localhost:" + port + "/users",
                HttpMethod.POST,
                new HttpEntity<>("""
                        {
                            "name": "a",
                            "email": "b"
                        }
                        """,
                        headers), String.class);

        Assertions.assertEquals(HttpStatus.CREATED, res.getStatusCode());
    }

    void editUser() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(APPLICATION_JSON);

        ResponseEntity<String> res = restTemplate.exchange(
                "http://localhost:" + port + "/users/1",
                HttpMethod.PUT,
                new HttpEntity<>("""
                        {
                            "name": "a",
                            "email": "c"
                        }
                        """,
                        headers), String.class);

        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
    }

    HttpStatusCode getUser() {
        return restTemplate.getForEntity("http://localhost:" + port + "/users/1", JsonNode.class).getStatusCode();
    }

    void deleteUser() {
        restTemplate.delete("http://localhost:" + port + "/users/1", String.class);
    }
}
