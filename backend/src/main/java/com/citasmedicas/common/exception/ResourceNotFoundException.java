package com.citasmedicas.common.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException forId(String resource, Long id) {
        return new ResourceNotFoundException(resource + " no encontrado con id " + id);
    }
}
