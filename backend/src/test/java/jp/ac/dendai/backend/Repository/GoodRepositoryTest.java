package jp.ac.dendai.backend.Repository;

import jp.ac.dendai.backend.Entity.Good;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GoodRepositoryTest {
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private GoodRepository goodRepository;

    private Good testGood;

    @BeforeEach
    void setUp() {
        testGood = new Good();
        testGood.setUserId("user1");
        testGood.setPostId("post1");
    }

    @Test
    void testSave() {
        String expectedSql = "INSERT INTO goods (user_id, post_id) VALUES (?, ?)";
        when(jdbcTemplate.update(eq(expectedSql), eq("user1"), eq("post1"))).thenReturn(1);
        goodRepository.save(testGood);
        verify(jdbcTemplate, times(1)).update(eq(expectedSql), eq("user1"), eq("post1"));
    }

    @Test
    void testDelete() {
        String expectedSql = "DELETE FROM goods WHERE post_id = ? AND user_id = ?";
        when(jdbcTemplate.update(eq(expectedSql), eq("post1"), eq("user1"))).thenReturn(1);
        goodRepository.delete("post1", "user1");
        verify(jdbcTemplate, times(1)).update(eq(expectedSql), eq("post1"), eq("user1"));
    }

    @Test
    void testCountByPostId() {
        when(jdbcTemplate.queryForObject(anyString(), eq(Integer.class), eq("post1"))).thenReturn(5);
        int count = goodRepository.countByPostId("post1");
        assertEquals(5, count);
    }

    @Test
    void testCountByPostId_null() {
        when(jdbcTemplate.queryForObject(anyString(), eq(Integer.class), eq("post1"))).thenReturn(null);
        int count = goodRepository.countByPostId("post1");
        assertEquals(0, count);
    }
} 