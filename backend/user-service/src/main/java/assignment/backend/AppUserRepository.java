package assignment.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "users")
public interface AppUserRepository extends PagingAndSortingRepository<AppUser, Long>, JpaRepository<AppUser, Long> {
}