package jp.ac.dendai.backend.Repository;

import jp.ac.dendai.backend.Entity.Point;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class PointRepositoryTest {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private PointRepository pointRepository;

    private Point testPoint;

    @BeforeEach
    void setUp() {
        testPoint = new Point("p1", 35.0, 139.0);
    }

    @Test
    void testFindByPointId_found() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("latitude", 35.0);
        resultMap.put("longitude", 139.0);

        when(jdbcTemplate.queryForMap(anyString(), eq("p1"))).thenReturn(resultMap);

        Point result = pointRepository.findByPointId("p1");
        assertNotNull(result);
        assertEquals("p1", result.getPointId());
        assertEquals(35.0, result.getLatitude());
        assertEquals(139.0, result.getLongitude());
    }

    @Test
    void testFindByPointId_notFound() {
        when(jdbcTemplate.queryForMap(anyString(), eq("p2"))).thenReturn(Collections.emptyMap());
        Point result = pointRepository.findByPointId("p2");
        assertNull(result);
    }

    @Test
    void testFindByAtPosition_found() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("point_id", "p1");

        when(jdbcTemplate.queryForMap(anyString(), eq(35.0), eq(139.0))).thenReturn(resultMap);

        Point result = pointRepository.findByAtPosition(35.0, 139.0);
        assertNotNull(result);
        assertEquals("p1", result.getPointId());
        assertEquals(35.0, result.getLatitude());
        assertEquals(139.0, result.getLongitude());
    }

    @Test
    void testFindByAtPosition_notFound() {
        when(jdbcTemplate.queryForMap(anyString(), eq(0.0), eq(0.0))).thenReturn(Collections.emptyMap());
        Point result = pointRepository.findByAtPosition(0.0, 0.0);
        assertNull(result);
    }

    @Test
    void testFindByNearPosition() {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> row = new HashMap<>();
        row.put("point_id", "p1");
        row.put("latitude", 35.0);
        row.put("longitude", 139.0);
        list.add(row);

        when(jdbcTemplate.queryForList(anyString(), anyDouble(), anyDouble(), anyDouble(), anyDouble()))
            .thenReturn(list);

        List<Point> result = pointRepository.findByNearPosition(35.0, 139.0);
        assertEquals(1, result.size());
        assertEquals("p1", result.get(0).getPointId());
    }

    @Test
    void testSave() {
        when(jdbcTemplate.update(anyString(), any(), any(), any())).thenReturn(1);
        pointRepository.save(testPoint);
        verify(jdbcTemplate, times(1)).update(anyString(), eq("p1"), eq(35.0), eq(139.0));
    }
}